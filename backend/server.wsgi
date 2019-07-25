#!/usr/bin/python3.5

import logging
import sys
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/var/www/esxebox/backend/')
from server import app
app.secret_key = 'anything you wish'
