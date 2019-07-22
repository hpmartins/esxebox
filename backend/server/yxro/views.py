from flask import Blueprint, request, make_response, jsonify, json
from flask.views import MethodView
from server import db
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

class Par2JsonAPI(MethodView):
    def post(self):
        post_data = request.get_json()

        sample = MultilayerSample()
        if sample.from_par(post_data):
            response = app.response_class(
                        response = sample.to_json(),
                        status = 200,
                        mimetype = 'application/json',
            )
            return response
        else:
            response = {
                        'status' : 'fail',
                        'message': 'Error converting par file to new format',
            }
            return make_response(jsonify(response)), 401

par2json_view = Par2JsonAPI.as_view('par2json_api')

yxro_blueprint.add_url_rule('/yxro/par2json', view_func=par2json_view, methods=['POST'])

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
