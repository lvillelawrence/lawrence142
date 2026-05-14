class CrosswordController < ApplicationController
  before_action :authenticate_admin!, only: [:edit, :update, :destroy]

  def show
    if admin_signed_in?
      @crossword = CrosswordSetting.order(created_at: :desc).first
    else
      @crossword = CrosswordSetting.where("release_date <= ?", Date.today).order(release_date: :desc).first
    end
  end

  def edit
    if params[:id].present?
      @crossword = CrosswordSetting.find(params[:id])
    else
      @crossword = CrosswordSetting.order(created_at: :desc).first || CrosswordSetting.new
    end
    @all_crosswords = CrosswordSetting.order(release_date: :desc, created_at: :desc)
  end

  def update
    @crossword = CrosswordSetting.new(crossword_params)
    if @crossword.save
      redirect_to crossword_path, notice: 'Crossword saved successfully!'
    else
      @all_crosswords = CrosswordSetting.order(release_date: :desc, created_at: :desc)
      render :edit
    end
  end

  def destroy
    @crossword = CrosswordSetting.find(params[:id])
    @crossword.destroy
    redirect_to edit_crossword_path, notice: 'Crossword deleted successfully!'
  end

  private

  def crossword_params
    params.require(:crossword_setting).permit(:puzzle_data, :release_date)
  end
end
