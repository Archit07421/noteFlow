const API_URL = "http://localhost:3000/api/auth";

const parseJsonSafe = async (res) => {
  try {
    return await res.json();
  } catch {
    return {};
  }
};

export const handleSignup = async (data)=>{
    const res = await fetch(`${API_URL}/signup`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    });

    const payload = await parseJsonSafe(res);
    return { ok: res.ok, status: res.status, data: payload };
}

export const handleLogin = async (data)=>{
    const res = await fetch(`${API_URL}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    });

    const payload = await parseJsonSafe(res);
    return { ok: res.ok, status: res.status, data: payload };
}


