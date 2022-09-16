class ArticlesController < ApplicationController

  before_action :authenticate_admin!, :except => [:index, :show, :section]

  def index
    def fetch(section, count = 8)
      return Article.where(section: section)
        .where('published <= ?', DateTime.now)
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
      .where('published <= ?', DateTime.now)
      .order(published: :desc)
      .limit(100)
  end

  def show
    @article = Article.find(params[:id])
    @related = true
  end

  def new
    @article = Article.new
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
      params.require(:article).permit(:title, :body, :published, :status, :section, :image, author_ids: [])
    end
end
