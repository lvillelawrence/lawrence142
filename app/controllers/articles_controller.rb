class ArticlesController < ApplicationController
  include HomepagePayload

  before_action :authenticate_admin!, :except => [:index, :show, :section]

  def index
    @home = true
    @news = fetch_for_homepage("News", 12)
    @opinions = fetch_for_homepage("Opinions", 12)
    @features = fetch_for_homepage("Features", 10)
    @arts = fetch_for_homepage("Arts", 10)
    @sports = fetch_for_homepage("Sports", 8)
    @editorial = fetch_for_homepage("Editorials", 1).first
    @homepage_json = homepage_json_payload.to_json.gsub("</", "<\\/")
  end

  def section
    @section = (params[:section]).capitalize
    @articles = Article.where(section: @section)
      .where("published <= ?", Time.current)
      .order(published: :desc)
      .limit(100)
  end

  def show
    @article = Article.includes(:authors).find(params[:id])
    if @article.published.present? && @article.published > Time.current && !admin_signed_in?
      redirect_to root_path, alert: "This article is not available yet."
      return
    end
    @related = true
  end

  def new
    @article = Article.new(published: Time.zone.now.change(sec: 0))
  end

  def create
    @article = Article.new(article_params)
    if @article.save
        redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    redirect_to root_path, status: :see_other
  end

  private

    def fetch_for_homepage(section, count = 8)
      scope = Article.where(section: section)
        .where("published <= ?", Time.current)
        .where.not(status: "Archived")
      scope = scope.where(status: "Public") unless admin_signed_in?
      scope.order(published: :desc).limit(count)
    end

    def article_params
      params.require(:article).permit(:title, :body, :published, :status, :section, :image, :image_credit, author_ids: [])
    end
end
