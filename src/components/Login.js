import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const loginData = { email, password };
            // Se for Android, substituir "localhost" por "10.0.2.2"
            const response = await fetch('http://localhost:8000/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            const result = await response.json();
            if (result.success) {
                // Navega para o dashborad . Supondo que result.user contenha os dados do usuário, incluindo o id
                navigation.navigate('Dashboard', { clienteId: result.user.id });
                //navigation.navigate('Dashboard');
            } else {
                Alert.alert('Erro', result.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível realizar o login');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10
    }
});

export default LoginScreen;
