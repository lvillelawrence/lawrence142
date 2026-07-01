class ArticlesController < ApplicationController

  before_action :authenticate_admin!, :except => [:index, :show, :section]

  def index
    @home = true
    @news = fetch_for_homepage("News", 20)
    @opinions = fetch_for_homepage("Opinions", 20)
    @features = fetch_for_homepage("Features", 20)
    @arts = fetch_for_homepage("Arts", 20)
    @sports = fetch_for_homepage("Sports", 20)
    @editorials = fetch_for_homepage("Editorials", 10)
    @editorial = @editorials.first
    @homepage_json = homepage_json_payload.to_json.gsub("</", "<\\/")
  end

  def section
    @section_page = true
    @section = section_name_from_param(params[:section])
    all = published_articles_scope
      .where(section: @section)
      .order(published: :desc)
      .includes(:authors, image_attachment: :blob)
      .limit(100)
      .to_a

    @section_featured = pick_section_featured(all)
    featured_id = @section_featured&.id
    @articles = featured_id ? all.reject { |article| article.id == featured_id } : all
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

    SECTION_PARAM_NAMES = {
      "news" => "News",
      "opinions" => "Opinions",
      "features" => "Features",
      "arts" => "Arts",
      "sports" => "Sports",
      "editorials" => "Editorials",
    }.freeze

    def section_name_from_param(param)
      SECTION_PARAM_NAMES.fetch(param.to_s.downcase) { param.to_s.capitalize }
    end

    def published_articles_scope
      scope = Article.where("published IS NOT NULL AND published <= ?", Time.current)
        .where.not(status: "Archived")
      admin_signed_in? ? scope : scope.where(status: "Public")
    end

    def pick_section_featured(articles)
      return nil if articles.blank?

      articles.find { |article| article.image.attached? } || articles.first
    end

    def fetch_for_homepage(section, count = 8)
      scope = published_articles_scope.where(section: section)
      scope.order(published: :desc)
        .includes(:authors, image_attachment: :blob)
        .limit(count)
    end

    def article_params
      params.require(:article).permit(:title, :body, :published, :status, :section, :image, :image_credit, author_ids: [])
    end
end
