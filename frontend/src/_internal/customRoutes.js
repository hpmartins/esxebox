import React from 'react';
import { Route } from 'react-router-dom';

import { SomePage } from '../pages';
import YXRO from '../YXRO';

export default [
    <Route exact path="/test" component={SomePage} />,
    <Route exact path="/yxro" component={YXRO} />,
];
