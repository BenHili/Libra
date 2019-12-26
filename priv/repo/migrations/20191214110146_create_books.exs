defmodule Libra.Repo.Migrations.CreateBooks do
  use Ecto.Migration

  def change do
    create table(:books) do
      add :title, :string
      add :authors, {:array, :string}
      add :image, :string
      add :isbn_13, :string
      add :page_count, :integer

      timestamps()
    end

    create unique_index(:books, [:isbn_13], name: :pk_isbn_13)
  end
end
