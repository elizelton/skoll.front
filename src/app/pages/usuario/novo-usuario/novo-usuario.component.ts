import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent {

  usuario: Usuario
  tituloPagina: string = "Novo Usuário"
  private sub: Subscription;
  private subService: Subscription;
  loading: boolean = false
  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    public poNotification: PoNotificationService) {

    this.usuario = new Usuario()
    this.usuario.Nome = ""
    this.usuario.userName = ""
    this.usuario.id = 0
    this.usuario.email = ""
    this.usuario.ativo = true
    this.usuario.senha = ""
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.subService)
      this.subService.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.usuario.id = +params['id'];

      if (this.usuario.id) {
        this.loading = true
        this.subService = this.usuarioService.get(this.usuario.id).subscribe({
          next: (res: any) => {
            debugger
            this.usuario = res;
            this.usuario.Nome = res.nome
            this.tituloPagina = `Editar Usuário #${res.id}`
            this.breadcrumb.items[2].label = "Editar"
            this.loading = false;
          }
        })
      }
    });
  }


  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Usuários', link: '/usuario' },
      { label: 'Novo' },
    ],
  };

  salvarUsuario() {
    if (this.usuario.id) {
      this.subService = this.usuarioService.update(this.usuario.id, this.usuario).subscribe({
        next: () => {
          this.poNotification.success('Usuário editado com sucesso!');
        }
      })
    }
    else {
      this.usuario.id = this.usuario.id || 0
      this.subService = this.usuarioService.insert(this.usuario).subscribe({
        next: (res: Usuario) => {
          this.usuario.id = res.id;
          this.poNotification.success('Usuário criado com sucesso!');
        }
      })
    }
  }

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvarUsuario.bind(this) },
    { label: 'Cancelar', url: '/usuario' }
  ];

}
