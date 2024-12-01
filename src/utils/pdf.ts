import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Lecturer } from '../types';
import { formatDate } from './date';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: 5,
    fontSize: 10
  },
  tableHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    textAlign: 'center',
    color: 'grey'
  }
});

export const LecturerReport = ({ lecturers }: { lecturers: Lecturer[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Lecturer Check-in Report</Text>
      
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Class</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Room</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Staff</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Check-in</Text>
          </View>
        </View>
        
        {lecturers.map((lecturer, i) => (
          <View key={i} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{lecturer.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{lecturer.className}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{lecturer.roomNumber}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{lecturer.admittingStaff}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{formatDate(lecturer.checkInDate)}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        Generated on {formatDate(new Date().toISOString())}
      </Text>
    </Page>
  </Document>
);