class WordleController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:guess]

  def show
  end

  def guess
    # Get the secret word - use default if database not set up yet
    begin
      secret_word = WordleSetting.last&.word&.upcase || "HELLO"
    rescue
      secret_word = "HELLO"
    end
    
    # Get the player's guess
    guess = params[:guess].to_s.upcase
    
    # Check each letter
    result = []
    guess.chars.each_with_index do |letter, index|
      if secret_word[index] == letter
        result << "correct"   # Green - right letter, right spot
      elsif secret_word.include?(letter)
        result << "present"   # Yellow - letter exists but wrong spot
      else
        result << "absent"    # Gray - letter not in word
      end
    end
    
    # Send back JSON response
    render json: { result: result, won: guess == secret_word }
  end
end