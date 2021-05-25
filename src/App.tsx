import { AuthProvider } from "@mbs/services/auth-service";
import { UserProvider } from "@mbs/services/user-service";
import { QueryProvider } from "@mbs/services/query-service";
import { AlertProvider } from "@mbs/services/alert-service";
import { StudentProvider } from "@mbs/services/student-service";
import { MainRouter } from "@mbs/routes";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<UserProvider>
					<QueryProvider>
						<AlertProvider>
							<StudentProvider>
								<MainRouter />
							</StudentProvider>
						</AlertProvider>
					</QueryProvider>
				</UserProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
