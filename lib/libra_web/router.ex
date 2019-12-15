defmodule LibraWeb.Router do
  use LibraWeb, :router
  use Pow.Phoenix.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :protected do
    plug Pow.Plug.RequireAuthenticated,
      error_handler: Pow.Phoenix.PlugErrorHandler
  end

  scope "/" do
    pipe_through :browser

    pow_routes()
  end

  scope "/", LibraWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/home", PageController, :index

    get "/buy", BuyController, :buy

    get "/sell", SellController, :sell

    pipe_through :protected
    get "/new", SellController, :new
    post "/create", SellController, :create
  end
end
