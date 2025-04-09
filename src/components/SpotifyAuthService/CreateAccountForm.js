import { useState } from "react";

export const CreateAccountForm = ({ handleCreateAccount, setShowCreateAccountForm}) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const saveCreateAccount = () => {
        handleCreateAccount(username, password);
    }

    return (
            <div className="login blur-background">
    
                <div class="container d-flex justify-content-center align-items-center vh-100">
                    <div class="card p-4 shadow-lg bg-light text-black">
                        <h2 class="text-center mb-4">Crear cuenta</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            
                        <div class="mb-3">
                            <label for="username" class="form-label">Usuario</label>
                            <input type="text" class="form-control"
                                id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingresa tu usuario" />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="password" 
                                value={password} onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Ingresa tu contraseña"/>
                        </div>
    
                        <div class="mb-3 d-flex justify-content-center align-items-center gap-2" >
                            <button type="button" className="btn btn-success" onClick={saveCreateAccount}>
                                Guardar
                            </button>
                            <button type="button" className="btn btn-danger" onClick={()=> setShowCreateAccountForm(false)}>
                                Cancelar
                            </button>

                        </div>
                            
                        </form>
                    </div>
                </div>
                 
            </div>
        );
}