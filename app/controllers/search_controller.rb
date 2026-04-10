class SearchController < ApplicationController
  def index
    if params[:query].nil? 
      return 
    end
    clean = "%#{params[:query].downcase}%"
    @query = params[:query]
    case params[:type]
    when "articles"
      scope = Article.where("lower(title) like ?", clean)
      @articles = admin_signed_in? ? scope : scope.where("published <= ?", Time.current)
    when "authors"
      @authors = Author.where("lower(firstname) like ? or lower(lastname) like ?", clean, clean)
    else 
      @error
    end
  end
end
