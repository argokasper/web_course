<?php
class Connection {
    protected string $servername = 'localhost';
    protected string $username = 'root';
    protected string $password = 'toor';
    protected string $database = 'replybot';

   /**
    * Error container
    *
    */
    public $connect_error;

    /**
     * MySQL connection object
     */
    private $connection;

    /**
     * kui kutsuda välja new Connection() käsk, siis käivitub __contruct()
     */
    public function __construct()
    {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->database);
        if ($conn->connect_error) {
            $this->connect_error = $conn->connect_error;
            throw new Exception('Andmebaasi ühendus nurjus.');
        }
        // salvestame loodud ühenduse ka klassi muutujasse:
        $this->connection = $conn;
    }

    /**
     * Kõikide sõnumite pärimiseks loodud funktsioon
     * @return array
     */
    public function getMessages(): array
    {
        $sql = 'SELECT * FROM messages';
        $results =$this->connection->query($sql);

        // Peidame SQL-i vigu, Vea kuvamise asemel saadame tagasi tühjad read
        if ($results === false) {
            return [];
        }

        return $results->fetch_all();
    }

    /**
     * KODUTÖÖ3: Kõikide sõnumite pärimiseks loodud funktsioon
     * @param string $message
     * @return bool
     */
    public function insertMessage(string $message): bool
    {
        // TODO! Andmebaasi INSERT käsu saatmine
        return false; // true if success, false otherwise
    }
}
