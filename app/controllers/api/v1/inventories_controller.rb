class Api::V1::InventoriesController < ApplicationController
    # before_action :authenticate_user!
    load_and_authorize_resource

    # GET /inventories
    def index
        @inventories = Inventory.all
        render json: @inventories
    end

    # GET /inventories/:id
    def show
        @inventory = Inventory.find(params[:id])
        render json: @inventory
    end

    # POST /inventories
    def create
        @inventory = Inventory.new(inventory_params)
        if @inventory.save
        render json: @inventory, status: :created
        else
        render json: @inventory.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /inventories/:id
    def update
        @inventory = Inventory.find(params[:id])
        if @inventory.update(inventory_params)
        render json: @inventory
        else
        render json: @inventory.errors, status: :unprocessable_entity
        end
    end

    # DELETE /inventories/:id
    def destroy
        @inventory = Inventory.find(params[:id])
        @inventory.destroy
        head :no_content
    end

    private

    # Only allow a trusted parameter "white list" through.
    def inventory_params
        params.require(:inventory).permit(:product_id, :quantity)
    end
end
  