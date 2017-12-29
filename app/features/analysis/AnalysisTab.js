import React, {Component} from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    ScrollView,
    View,
    ListView
} from 'react-native';

import OneRMSliderScreen from './sliders/OneRMSlider/OneRMSliderScreen';
import OneRMChartScreen from './charts/OneRMChartScreen';

class AnalysisTab extends Component {
            
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent:'flex-start' }}>
                    
                    <OneRMSliderScreen />
                </View>
            </ScrollView>
        );
    }
}

export default AnalysisTab;
