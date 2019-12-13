class Api::TagsController < ApplicationController
    def index
        @tags = Tag.all
    end
end
