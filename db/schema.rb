# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2026_04_10_140000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.text "name"
    t.text "body"
    t.text "record_type"
    t.bigint "record_id"
    t.timestamptz "created_at"
    t.timestamptz "updated_at"
    t.index ["record_type", "record_id", "name"], name: "idx_16880_index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.text "name"
    t.text "record_type"
    t.bigint "record_id"
    t.bigint "blob_id"
    t.timestamptz "created_at"
    t.index ["blob_id"], name: "idx_16866_index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "idx_16866_index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.text "key"
    t.text "filename"
    t.text "content_type"
    t.text "metadata"
    t.text "service_name"
    t.bigint "byte_size"
    t.text "checksum"
    t.timestamptz "created_at"
    t.index ["key"], name: "idx_16859_index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id"
    t.text "variation_digest"
    t.index ["blob_id", "variation_digest"], name: "idx_16873_index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admins", force: :cascade do |t|
    t.text "email", default: ""
    t.text "encrypted_password", default: ""
    t.text "reset_password_token"
    t.timestamptz "reset_password_sent_at"
    t.timestamptz "remember_created_at"
    t.timestamptz "created_at"
    t.timestamptz "updated_at"
    t.bigint "sign_in_count", default: 0
    t.timestamptz "current_sign_in_at"
    t.timestamptz "last_sign_in_at"
    t.text "current_sign_in_ip"
    t.text "last_sign_in_ip"
    t.index ["email"], name: "idx_16849_index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "idx_16849_index_admins_on_reset_password_token", unique: true
  end

  create_table "articles", force: :cascade do |t|
    t.text "title"
    t.text "body"
    t.timestamptz "created_at"
    t.timestamptz "updated_at"
    t.text "status"
    t.text "section"
    t.datetime "published", precision: nil
    t.bigint "author_id"
    t.text "image"
    t.string "image_credit"
    t.index ["author_id"], name: "idx_16893_index_articles_on_author_id"
  end

  create_table "authors", force: :cascade do |t|
    t.text "firstname"
    t.text "lastname"
    t.bigint "gradyear"
    t.text "position"
    t.timestamptz "created_at"
    t.timestamptz "updated_at"
  end

  create_table "collaborations", force: :cascade do |t|
    t.bigint "author_id"
    t.bigint "article_id"
  end

  create_table "crossword_settings", force: :cascade do |t|
    t.text "puzzle_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "release_date"
  end

  create_table "internals", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "issues", force: :cascade do |t|
    t.string "name"
    t.datetime "date", precision: nil
    t.string "pdf"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "netusers", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_netusers_on_email", unique: true
    t.index ["reset_password_token"], name: "index_netusers_on_reset_password_token", unique: true
  end

  create_table "wordle_settings", force: :cascade do |t|
    t.string "word"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id", name: "active_storage_attachments_blob_id_fkey"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id", name: "active_storage_variant_records_blob_id_fkey"
  add_foreign_key "articles", "authors", name: "articles_author_id_fkey"
end
