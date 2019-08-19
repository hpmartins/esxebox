from flask import Blueprint, request, make_response, jsonify, json
from flask.views import MethodView
from server import db
from flask_jwt_extended import (
    jwt_required, get_jwt_identity, create_access_token,
)

from pyxro import MultilayerSample
from server import app

# bokeh
from bokeh.plotting import Figure
from bokeh.resources import CDN
from bokeh.embed import json_item
from bokeh.layouts import column
from bokeh.models import CustomJS, ColumnDataSource, Slider
from bokeh.sampledata.autompg import autompg

yxro_blueprint = Blueprint('yxro', __name__)


def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

class Par2JsonAPI(MethodView):
    @jwt_required
    def post(self):
        current_user = get_jwt_identity()
        post_data = request.get_json()

        sample = MultilayerSample()
        try:
            status  = sample.from_par(post_data['payload'])
            payload = sample.to_json()
        except:
            status  = 0
            payload = ''

        response = {
                    'status' : status,
                    'payload': payload,
        }
        return make_response(jsonify(response), 200)

class Json2ParAPI(MethodView):
    @jwt_required
    def post(self):
        current_user = get_jwt_identity()
        post_data = request.get_json()

        sample = MultilayerSample()
        status  = sample.from_json(post_data['payload'])
        payload = sample.to_parfile()
        response = {
                    'status' : status,
                    'payload': payload,
        }
        return make_response(jsonify(response), 200)

par2json_view = Par2JsonAPI.as_view('par2json_api')
json2par_view = Json2ParAPI.as_view('json2par_api')
yxro_blueprint.add_url_rule('/yxro/par2json', view_func=par2json_view, methods=['POST'])
yxro_blueprint.add_url_rule('/yxro/json2par', view_func=json2par_view, methods=['POST'])

@app.route('/yxro/bokeh')
def bokeh():
    x = [x*0.005 for x in range(0, 200)]
    y = x

    source = ColumnDataSource(data=dict(x=x, y=y))

    plot = Figure(plot_width=400, plot_height=400)
    plot.line('x', 'y', source=source, line_width=3, line_alpha=0.6)

    callback = CustomJS(args=dict(source=source), code="""
        var data = source.data;
        var f = cb_obj.value
        var x = data['x']
        var y = data['y']
        for (var i = 0; i < x.length; i++) {
            y[i] = Math.pow(x[i], f)
        }
        source.change.emit();
    """)

    slider = Slider(start=0.1, end=4, value=1, step=.1, title="power")
    slider.js_on_change('value', callback)
    layout = column(slider, plot)

    return json.dumps(json_item(layout, "myplot"))
