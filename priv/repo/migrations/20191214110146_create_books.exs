defmodule Libra.Repo.Migrations.CreateBooks do
  use Ecto.Migration

  def change do
    create table(:books) do
      add :title, :string
      add :authors, {:array, :string}
      add :description, :string
      add :image, :string
      add :google_id, :string
      add :page_count, :integer

      timestamps()
    end

  end
end
