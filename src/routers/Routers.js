import React, {Component} from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import HomeTab from "../component/tab/HomeTab";
import CardTab from "../component/tab/CardTab";
import BookTab from "../component/tab/BookTab";
import PlanetTab from "../component/tab/PlanetTab";
import ShowListCount from '../component/ShowListCount';
const MainNavigator = createBottomTabNavigator({
    HomeTab: HomeTab,
    CardTab: CardTab,
    BookTab: BookTab,
    PlanetTab: PlanetTab
});
const routers = createStackNavigator({
    Main: {
        screen: MainNavigator,
        navigationOptions: {header: null}
    },
    ShowListCount: {
        screen: ShowListCount,
        navigationOptions: {header: null}
    }
});
export default routers;
