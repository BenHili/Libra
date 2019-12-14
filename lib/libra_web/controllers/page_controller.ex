defmodule LibraWeb.PageController do
  require Logger
  require HTTPoison

  alias Libra.Book
  use LibraWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
