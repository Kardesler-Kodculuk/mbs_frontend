import { AuthProvider } from "@mbs/services/auth-service"
import { UserProvider } from "@mbs/services/user-service"
import { QueryProvider } from "@mbs/services/query-service"
import { AlertProvider } from "@mbs/services/alert-service"
import { MainRouter } from "@mbs/routes"


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <UserProvider>
          <QueryProvider>
            <AlertProvider>
              <MainRouter />
            </AlertProvider>
          </QueryProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
