import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    TouchableHighlight,
    AsyncStorage
} from "react-native";


const Container = (props) => {
    return (
        <View style={styles.labelContainer}>
            {props.children}
        </View>
    );
}

const Button = (props) => {

    function getContent() {
        if (props.children) {
            return props.children;
        }
        return <Text style={props.styles.label}>{props.label}</Text>
    }

    return (
        <TouchableHighlight
            underlayColor="#ccc"
            onPress={props.onPress}
            style={[
                props.noDefaultStyles ? '' : styles.button,
                props.styles ? props.styles.button : '']}
        >
            {getContent()}
        </TouchableHighlight>
    );
}

const Label = (props) => {
    return (
        <Text
            style={props.styles && props.styles.textLabel ? props.styles.textLabel : styles.textLabel}
        >
            {props.text}
        </Text>
    );
}

export default class LoginWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : undefined,
            password : undefined,
            token : undefined,
            role : undefined,
        }
        AsyncStorage.getItem("JWToken", (err, item) => {
            if(item){
                global.token = item;
                AsyncStorage.getItem("username", (err, item) => {
                    if(item){
                        global.username = item;
                        AsyncStorage.getItem("role", (err, item) => {
                            if(item){
                                global.role = item;
                                this.props.navigation.navigate("Home", {});
                            }
                        });
                    }
                });
            }
        });
    }
    press() {
        data = {
            'username' : this.state.username,
            'password' : this.state.password,
        };
        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
        //console.error(this.state);
        //console.error(this.state.username);
        fetch('http://10.10.10.10:3000/auth/signIn', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body: formBody,
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({token: responseJson.token, role: responseJson.role, username: data.username});
            global.token = this.state.token;
            global.username = this.state.username;
            global.role = this.state.role;
            console.log(this.state.username);
            AsyncStorage.setItem("JWToken", global.token);
            AsyncStorage.setItem("role", global.role);
            AsyncStorage.setItem("username", global.username);
            this.props.navigation.navigate("Home", {});
        }).catch((error) => console.log(error));
    } 
    render() {
        return (<View>
            <Container>
                <Label text="Username" />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(username) => this.setState({ username })} 
                    value={this.state.username}
                />
            </Container>
            <Container>
                <Label text="Password" />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={(password) => this.setState({ password })} 
                    value={this.state.password}
                />
            </Container>
            <Container>
                <Button
                    label="Sign In"
                    styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
                    onPress={this.press.bind(this)} />
            </Container>
        </View>)
    }
}

const styles = StyleSheet.create({
    textLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Verdana',
        marginBottom: 10,
        color: '#595856'
    },
    labelContainer: {
        marginBottom: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    buttonWhiteText: {
        fontSize: 20,
        color: '#FFF',
    },
    primaryButton: {
        backgroundColor: '#34A853'
    },

});