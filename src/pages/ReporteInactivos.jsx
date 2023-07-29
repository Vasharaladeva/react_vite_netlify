import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, Link } from '@react-pdf/renderer';
import axios from 'axios';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white', // Cambiar el color de fondo
    padding: 20, // Aumentar el espacio interno en todas las páginas
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    borderWidth: 1, // Agregar borde
    borderColor: '#ccc', // Color del borde
    borderStyle: 'solid', // Estilo del borde
    borderRadius: 8, // Radio de la esquina del borde
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', // Agregar sombra
  },
  heading: {
    fontSize: 28, // Aumentar el tamaño de la fuente
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Alinear al centro
    color: '#333', // Cambiar el color del texto
  },
  subheading: {
    fontSize: 18, // Tamaño de fuente para subtítulos
    fontWeight: 'bold',
    marginBottom: 10, // Espacio entre subtítulos y contenido
    color: '#555', // Color del texto
  },
  item: {
    fontSize: 14, // Aumentar el tamaño de la fuente
    marginBottom: 5,
  },
  separator: {
    borderBottom: '1px solid #ccc', // Línea divisoria con color gris claro
    marginBottom: 10, // Espacio después del separador
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20, // Posición en la parte inferior
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10, // Tamaño de fuente del número de página
    color: '#555', // Color del número de página
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Ancho de la imagen del logo
    height: 50, // Alto de la imagen del logo
  },
  studentContainer: {
    flexDirection: 'row', // Mostrar imagen y texto en una fila
    alignItems: 'center', // Centrar verticalmente
    marginBottom: 10, // Espacio entre cada estudiante
    paddingBottom: 10, // Espacio inferior dentro del contenedor del estudiante
    borderBottom: '1px solid #ccc', // Línea divisoria entre estudiantes
  },
  studentImage: {
    width: 60, // Ancho de la imagen del estudiante
    height: 60, // Alto de la imagen del estudiante
    marginRight: 10, // Espacio entre la imagen y el texto
  },
  phoneNumber: {
    color: 'blue', // Color del texto del número de teléfono (azul para parecer un enlace)
    textDecoration: 'underline', // Subrayar el texto para indicar que es un enlace
    marginLeft: 5, // Espacio entre el texto y el ícono de WhatsApp
  },
  whatsappIcon: {
    fontSize: 12, // Tamaño del ícono de WhatsApp
    color: 'green', // Color del ícono de WhatsApp (verde)
  },
});

const ReporteInactivos = () => {
  const [estudiantes, setEstudiantes] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('https://form-node-back.onrender.com/estudianteina')
      .then((response) => {
        setEstudiantes(response.data.estudiantes);
      })
      .catch((error) => {
        console.log('Error al obtener usuarios inactivos:', error);
      });
  }, []);

  const getCurrentDateAndTime = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  };

  // Función para crear enlaces de WhatsApp
  const getWhatsAppLink = (phoneNumber) => {
    const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    return `https://wa.me/${formattedPhoneNumber}`; // Agregar el prefijo de enlace de WhatsApp
  };

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Image
              src="../../public/logo1.png" // Ruta relativa a la imagen del logo
              style={styles.logo}
            />
            <Text style={styles.heading}>Reporte de Usuarios Inactivos</Text>
            <View style={styles.separator} />
            <Text style={styles.subheading}>Fecha y Hora: {getCurrentDateAndTime()}</Text>
            <View style={styles.separator} />
            <View style={styles.item}>
              {estudiantes.map((person) => (
                <View key={person.email} style={styles.studentContainer}>
                  <Image
                    src={`https://form-node-back.onrender.com/${person.imagenPerfil}`} // Ruta absoluta de la imagen
                    style={styles.studentImage} // Estilo de la imagen
                  />
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      Nombre: {person.nombre} {person.apellido}
                    </Text>
                    <Text>Email: {person.email}</Text>
                    <Text>Colegio: {person.colegio}</Text>
                    <Text>
                      Telefono:
                      <Link src={getWhatsAppLink(person.telefono)}>
                        <Text style={styles.phoneNumber}>{person.telefono}</Text>
                      </Link>
                    </Text>
                    {/* Agrega aquí los demás campos que desees mostrar en el reporte */}
                  </View>
                  <View style={styles.separator} />
                </View>
              ))}
            </View>
            {/* Números de página */}
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
              fixed
            />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ReporteInactivos;
