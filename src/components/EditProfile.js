import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const EditProfile = ({ navigation, route }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const clienteId = route.params?.clienteId || 1;

    useEffect(() => {
        // Carrega os dados do usuário, incluindo telefone
        fetch(`http://localhost:8000/get_user.php?cliente_id=${clienteId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setNome(data.user.nome);
                    setEmail(data.user.email);
                    setTelefone(data.user.telefone); // Adiciona o telefone ao estado
                } else {
                    Alert.alert("Erro", "Não foi possível carregar os detalhes do usuário");
                }
            })
            .catch(error => {
                console.error('Erro ao buscar usuário:', error);
                Alert.alert("Erro", "Não foi possível carregar os detalhes");
            });
    }, [clienteId]);

    // Envia o código de verificação via endpoint send_verification.php
    const handleSendVerification = async () => {
        try {
            const payload = {
                phone: phone,
                cliente_id: clienteId
            };

            const response = await fetch('http://localhost:8000/send_verification.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.success) {
                Alert.alert("Código enviado", result.message);
            } else {
                Alert.alert("Erro", result.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível enviar o código");
        }
    };

    // Salva as alterações de nome e email via endpoint update_profile.php
    const handleSave = async () => {
        try {
            const payload = {
                cliente_id: clienteId,
                nome: nome,
                email: email,
            };

            const response = await fetch('http://localhost:8000/update_profile.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.success) {
                Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
                navigation.goBack();
            } else {
                Alert.alert("Erro", result.message);
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            Alert.alert("Erro", "Não foi possível atualizar o perfil");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome"
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
            />

            {/* Exibe o número de telefone do usuário (somente leitura) */}
            <View style={styles.phoneContainer}>
                <Text style={styles.label}>Telefone:</Text>
                <Text style={styles.phoneText}>{telefone}</Text>
            </View>

            {/* Botão para enviar o código de verificação */}
            <View style={styles.buttonContainer}>
                <Button title="ENVIAR CÓDIGO DE VERIFICAÇÃO" onPress={handleSendVerification} />
            </View>

            {/* Espaço entre os botões */}
            <View style={{ height: 10 }} />

            {/* Botão para salvar as alterações */}
            <View style={styles.buttonContainer}>
                <Button title="SALVAR" onPress={handleSave} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10
    },
    phoneText: {
        fontSize: 16
    },
    buttonContainer: {
       marginBottom: 10
    }
});

export default EditProfile;
