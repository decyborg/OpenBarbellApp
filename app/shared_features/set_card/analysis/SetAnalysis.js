import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native';

class SetAnalysis extends Component {

    _renderAnalysis(value, unit, description, isBigMetric) {
        if (isBigMetric) {
            return (
                <View style={styles.bigMetricBackground}>
                    <Text style={styles.bigMetricText}>{value}</Text>
                    <Text style={styles.bigMetric}>{unit}</Text>
                    <Text style={styles.bigMetric}>{description}</Text>
                </View>
            );
        } else {
            if (unit !== null && unit !== '') {
                var text = unit + "\n" + description;
            } else {
                var text = description;
            }
            return (
                <View style={{flex: 1, marginTop: -2, justifyContent: 'center'}}>
                    <Text style={styles.text}>
                        {value}
                    </Text>
                    <Text style={styles.metric}>{text}</Text>
                </View>  
            );
        }
    }

    render() {
        let { height, width } = Dimensions.get('window');
        let lastColumn = null;
        if (width > 350) {
            lastColumn = this._renderAnalysis(this.props.value5, this.props.unit5, this.props.description5, false);
        }
        
        return (
            <View style={[styles.border, styles.container, {flex:1, flexDirection: 'row'}]}>
                {this._renderAnalysis(this.props.value1, this.props.unit1, this.props.description1, true)}
                {this._renderAnalysis(this.props.value2, this.props.unit2, this.props.description2, false)}
                {this._renderAnalysis(this.props.value3, this.props.unit3, this.props.description3, false)}
                {this._renderAnalysis(this.props.value4, this.props.unit4, this.props.description4, false)}
                {lastColumn}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor:'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
    },
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    text: {
        color: '#4d4d4d',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    metric: {
        color: '#4d4d4d',
        fontSize: 8,
        fontWeight: "500",
        paddingTop: 3,
        paddingBottom: 5,
        marginTop: -8,
        marginLeft: 3,
        marginRight: 3,
        textAlign: 'center',
    },
    bigMetricBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#fddddd',
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        borderColor: '#fddddd',
        overflow: 'hidden',        
    },
    bigMetricText: {
        textAlign: 'center',
        color: '#f0565a',        
        fontSize: 20,
        fontWeight: 'bold',
    }, 
    bigMetric: {
        textAlign: 'center',
        color: '#f0565a',
        fontSize: 10,
        fontWeight: 'bold',        
    }
});

export default SetAnalysis;
