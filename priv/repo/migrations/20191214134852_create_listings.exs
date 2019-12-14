defmodule Libra.Repo.Migrations.CreateListings do
  use Ecto.Migration

  def change do
    create table(:listings) do
      add :description, :string
      add :price, :decimal
      add :user_id, references(:users, on_delete: :nothing)
      add :book_id, references(:books, on_delete: :nothing)

      timestamps()
    end

    create index(:listings, [:user_id])
    create index(:listings, [:book_id])
  end
end
