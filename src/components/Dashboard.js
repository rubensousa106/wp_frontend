import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';

const Dashboard = ({ navigation, route }) => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);


    const clienteId = route.params?.clienteId || 1; // valor default para testes

    useEffect(() => {
        // Se for Android, substituir "localhost" por "10.0.2.2"
        fetch(`http://localhost:8000/products.php?cliente_id=${clienteId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProdutos(data.data);
                } else {
                    console.error(data.message);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                setLoading(false);
            });
    }, [clienteId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#000" />;
    }

    return (
        <View style={styles.container}>
            {/* Botão para editar o perfil */}
            <Button
                title="Editar Perfil"
                onPress={() => navigation.navigate('EditProfile', { clienteId })}
            />
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.nome}</Text>
                        <Text>{item.descricao}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    item: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    title: { fontSize: 18, fontWeight: 'bold' },
});

export default Dashboard;
