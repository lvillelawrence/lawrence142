class ArticlesController < ApplicationController

  before_action :authenticate_admin!, :except => [:index, :show, :section]

  def index
    def fetch(section, count = 8)
      return Article.where(section: section)
        .where("published <= ?", Time.current)
        .order(published: :desc)
        .limit(count) 
    end
    @home = true
    @news = fetch("News")
    @opinions = fetch("Opinions")
    @features = fetch("Features")
    @arts = fetch("Arts")
    @sports = fetch("Sports")
    @editorial = fetch("Editorials", 1)
      .first
  end

  def section
    @section = (params[:section]).capitalize
    @articles = Article.where(section: @section)
      .where("published <= ?", Time.current)
      .order(published: :desc)
      .limit(100)
  end

  def show
    @article = Article.includes(:authors, :rich_text_body, image_attachment: :blob).find(params[:id])
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
    def article_params
      params.require(:article).permit(:title, :body, :published, :status, :section, :image, :image_credit, author_ids: [])
    end
end
