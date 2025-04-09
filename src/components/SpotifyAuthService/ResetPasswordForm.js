import { useState } from "react";

export const ResetPasswordForm = ({ handleResetPassword, setShowResetPasswordForm}) => {

    const [password, setPassword] = useState(null);
    
    const saveResetPassword = () => {
        handleResetPassword(password);
    }

    return (
            <div className="login blur-background">
    
                <div class="container d-flex justify-content-center align-items-center vh-100">
                    <div class="card p-4 shadow-lg bg-light text-black">
                        <h2 class="text-center mb-4">Cambiar contraseña</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            
                            <div class="mb-3">
                                <label for="password" class="form-label">Nueva contraseña</label>
                                <input type="text" class="form-control" id="password" 
                                    value={password} onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Escribe tu nueva Contraseña"/>
                            </div>
    
                        <div class="mb-3 d-flex justify-content-center align-items-center gap-2" >
                            <button type="button" className="btn btn-success" onClick={saveResetPassword}>
                                Guardar
                            </button>
                            <button type="button" className="btn btn-danger" onClick={()=> setShowResetPasswordForm(false)}>
                                Cancelar
                            </button>

                        </div>
                            
                        </form>
                    </div>
                </div>
                 
            </div>
        );
}