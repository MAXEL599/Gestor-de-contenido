import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class conexion {
    private static final String URL = "jdbc:sqlserver://localhost:1433;databaseName=tuBaseDeDatos";
    private static final String USER = "tuUsuario";
    private static final String PASSWORD = "tuContraseña";

    public Connection conectar() {
        Connection conexion = null;
        try {
            // Cargar el controlador JDBC de SQL Server
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            // Establecer la conexión
            conexion = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Conexión exitosa a la base de datos");
        } catch (ClassNotFoundException e) {
            System.err.println("Error al cargar el controlador JDBC: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Error al conectar a la base de datos: " + e.getMessage());
        }
        return conexion;
    }


    
    public static void main(String[] args) {
        conexion con = new conexion();
        con.conectar();
    }
}
