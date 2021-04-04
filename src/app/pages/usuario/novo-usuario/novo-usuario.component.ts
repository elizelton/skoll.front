import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoNotificationService, PoPageAction, PoPasswordComponent } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent {

  usuario: Usuario;
  tituloPagina: string = "Novo Usuário";
  private sub: Subscription;
  private subService: Subscription;
  confirmarSenhaModel: string;
  loading: boolean = false;
  @ViewChild('confirmarSenhaComponente', { static: true }) confirmarSenhaComponente: PoPasswordComponent;


  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    public poNotification: PoNotificationService) {

    this.usuario = new Usuario();
    this.usuario.Nome = "";
    this.usuario.userName = "";
    this.usuario.id = 0;
    this.usuario.email = "";
    this.usuario.ativo = true;
    this.usuario.senha = "";
    this.confirmarSenhaModel = "";

    this.actions[0].disabled = true;
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
        this.actions[0].disabled = false;
        this.loading = true
        this.subService = this.usuarioService.get(this.usuario.id).subscribe({
          next: (res: any) => {
            this.usuario = res;
            this.usuario.Nome = res.nome;
            this.tituloPagina = `Editar Usuário #${res.id}`;
            this.breadcrumb.items[2].label = "Editar";
            this.loading = false;;
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
          this.poNotification.success({ message: 'Usuário editado com sucesso!', duration: 6000 });
        }
      })
    }
    else {
      this.usuario.id = this.usuario.id || 0
      this.subService = this.usuarioService.insert(this.usuario).subscribe({
        next: (res: Usuario) => {
          this.usuario.id = res.id;
          this.tituloPagina = `Editar Usuário #${res.id}`;
          this.breadcrumb.items[2].label = "Editar";
          this.loading = false;
          this.poNotification.success({ message: 'Usuário criado com sucesso!', duration: 6000 });
        }
      })
    }
  }
  validarSenha() {
    if (this.usuario.senha !== this.confirmarSenhaModel) {
      this.poNotification.warning({ message: "As senhas devem ser iguais.", duration: 6000 });
      this.actions[0].disabled = true;
    }
    else {
      this.actions[0].disabled = false;
    }
  }
  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvarUsuario.bind(this) },
    { label: 'Cancelar', url: '/usuario' }
  ];

}
