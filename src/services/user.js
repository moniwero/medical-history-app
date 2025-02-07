import { supabase } from "./supabase";

// Sprawdzenie użytkownika, użycie w Home.jsx
export const checkUser = async (setUser, setLoading) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    setUser(session.user);
  } else {
    // Próbuj odświeżyć sesję, jeśli jej nie ma
    const { data: refreshedSession, error } =
      await supabase.auth.refreshSession();
    if (refreshedSession) {
      setUser(refreshedSession.user);
    } else {
      console.error("Nie udało się odświeżyć sesji:", error);
      setUser(null);
    }
  }

  setLoading(false); // Koniec ładowania
};

// Nasłuchiwanie zmian stanu użytkownika, użycie w Home.jsx
export const listenToAuthChanges = (setUser) => {
  const { data: authListener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setUser(session?.user ?? null);
    }
  );

  // Sprzątanie po nasłuchiwaniu
  return () => authListener?.subscription?.unsubscribe();
};

// Wylogowanie, użycie w Home.jsx
export const handleLogout = async (setUser) => {
  await supabase.auth.signOut();
  setUser(null);
};

// Logowanie i rejestracja, użycie w Login.jsx
export const handleLoginOrRegister = async (
  email,
  password,
  setError,
  navigate
) => {
  setError(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Wprowadź poprawny adres email.");
    return;
  }

  if (password.length < 6) {
    setError("Hasło musi mieć co najmniej 6 znaków.");
    return;
  }

  try {
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      console.error("Login error:", loginError.message);

      if (loginError.message === "Invalid login credentials") {
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (signUpError) {
          setError("Użytkownik już istnieje. Wprowadż poprawne hasło.");
          console.error("Sign-up error:", signUpError.message);
        } else {
          console.log(
            "Zarejestrowano i zalogowano użytkownika:",
            signUpData.user
          );
          navigate("/dashboard");
        }
      } else {
        setError(
          "Wystąpił błąd logowania. Sprawdź swoje dane i spróbuj ponownie."
        );
      }
    } else {
      console.log("Użytkownik zalogowany:", loginData.user);
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Nieoczekiwany błąd:", error.message);
    setError(`Wystąpił nieoczekiwany błąd: ${error.message}`);
  }
};
