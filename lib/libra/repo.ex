defmodule Libra.Repo do
  use Ecto.Repo,
    otp_app: :libra,
    adapter: Ecto.Adapters.Postgres
end
