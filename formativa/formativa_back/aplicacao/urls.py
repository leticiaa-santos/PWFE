from django.urls import path
from .views import (LoginView, 
                    UsuarioListCreate, 
                    UsuarioRetrieveUpdateDestroy, 
                    ReservaAmbienteListCreate, 
                    ReservaAmbienteRetrieveUpdateDestroy, 
                    ReservaAmbienteProfessorList, 
                    DisciplinaListCreate, 
                    DisciplinaRetrieveUpdateDestroy, 
                    DisciplinaProfessorList, 
                    SalaListCreate, 
                    SalaRetrieveUpdateDestroy,
                    ProfessoresListView,
                    GestoresListView)

urlpatterns = [
    # Login
    path('login/', LoginView.as_view()),
    
    # Usuario
    path('usuario/', UsuarioListCreate.as_view()),
    path('usuario/<int:pk>/', UsuarioRetrieveUpdateDestroy.as_view()),
    path('usuario/professor/', ProfessoresListView.as_view()),
    path('usuario/gestor/', GestoresListView.as_view()),

    # Sala
    path('sala/', SalaListCreate.as_view()),
    path('sala/<int:pk>/', SalaRetrieveUpdateDestroy.as_view()),

    # Disciplina
    path('disciplinas/', DisciplinaListCreate.as_view()),
    path('disciplinas/<int:pk>/', DisciplinaRetrieveUpdateDestroy.as_view()),
    path('professor/disciplinas/', DisciplinaProfessorList.as_view()),   

    # Reserva Ambiente
    path('reservas/', ReservaAmbienteListCreate.as_view()),
    path('reservas/<int:pk>/', ReservaAmbienteRetrieveUpdateDestroy.as_view()),
    path('professor/reservas/', ReservaAmbienteProfessorList.as_view()),
]