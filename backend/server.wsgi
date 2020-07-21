import sys
sys.path.insert(0, '/var/www/esxebox/backend/')

from server import app as application
application.secret_key = 'anything you wish'

if __name__ == '__main__':
    application.run()

