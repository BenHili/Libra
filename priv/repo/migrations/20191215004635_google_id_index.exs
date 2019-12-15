defmodule Libra.Repo.Migrations.GoogleIdIndex do
  use Ecto.Migration

  def change do
    create unique_index(:books, [:google_id], name: :pk_google_id)
  end
end
