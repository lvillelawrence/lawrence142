require "test_helper"

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get masthead" do
    get static_pages_masthead_url
    assert_response :success
  end

  test "should get contact" do
    get static_pages_contact_url
    assert_response :success
  end

  test "should get about" do
    get static_pages_about_url
    assert_response :success
  end

  test "should get privacy" do
    get static_pages_privacy_url
    assert_response :success
  end

  test "should get terms" do
    get static_pages_terms_url
    assert_response :success
  end
end
