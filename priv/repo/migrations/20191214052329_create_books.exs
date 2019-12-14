defmodule Libra.Repo.Migrations.CreateBooks do
  use Ecto.Migration

  def change do
    create table(:books) do
      add :title, :string
      add :price, :decimal
      add :description, :string
      add :image, :string

      timestamps()
    end

  end
end
