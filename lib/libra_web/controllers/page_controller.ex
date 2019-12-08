defmodule LibraWeb.PageController do
  use LibraWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
