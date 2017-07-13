require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
  erb :index, :layout => :_layout, :locals => { title: 'Gopal Adhikari' }
end
