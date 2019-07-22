import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import { withRouter } from 'react-router-dom';
import {
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';

import SubMenu from './SubMenu';

class Menu extends Component {
    state = {
        menuYXRO: false,
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    render() {
        const { onMenuClick, open, logout } = this.props;
        return (
            <div>
                {' '}
                <DashboardMenuItem onClick={onMenuClick} />
                <SubMenu
                    handleToggle={() => this.handleToggle('menuYXRO')}
                    isOpen={this.state.menuYXRO}
                    sidebarIsOpen={open}
                    name="YXRO"
                    icon={<SettingsIcon />}
                >
                  <MenuItemLink
                              to="/yxro"
                              primaryText='YXRO'
                              leftIcon={<SettingsIcon />}
                              onClick={onMenuClick}
                  />
                    <MenuItemLink
                                to="/test"
                                primaryText='Teste A'
                                leftIcon={<SettingsIcon />}
                                onClick={onMenuClick}
                    />
                </SubMenu>
                <MenuItemLink
                            to="/test"
                            primaryText='Teste A'
                            leftIcon={<SettingsIcon />}
                            onClick={onMenuClick}
                />
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
);

export default enhance(Menu);
