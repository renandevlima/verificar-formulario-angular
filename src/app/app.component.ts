import { Component } from '@angular/core';

interface Options {
  label: string;
  value: string;
}

interface Questions {
  id: number;
  question: string;
  options: Options[];
  answer: string;
  justifyRequired: boolean;
  justifyAble: boolean;
  justify: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  questions: Questions[] = [
    {
      id: 1,
      question: "Pergunta 1",
      options: [
        {
          value: "A",
          label: "Resposta 1"
        },
        {
          value: "B",
          label: "Resposta 2"
        },
      ],
      answer: '',
      justifyAble: true,
      justifyRequired: false,
      justify: ''
    },
    {
      id: 2,
      question: "Pergunta 2",
      options: [
        {
          value: "A",
          label: "Resposta 1"
        },
        {
          value: "B",
          label: "Resposta 2"
        },
      ],
      answer: '',
      justifyAble: true,
      justifyRequired: true,
      justify: ''
    },
    {
      id: 3,
      question: "Pergunta 3",
      options: [
        {
          value: "A",
          label: "Resposta 1"
        },
        {
          value: "B",
          label: "Resposta 2"
        },
      ],
      answer: '',
      justifyAble: false,
      justifyRequired: false,
      justify: ''
    }
  ]

  chooseQuestion(e: any, id: number): void {
    if (e.target && e.target.value) {
      this.questions[id].answer = e.target.value;
    }
  }

  chooseJustify(e: any, id: number): void {
    if (e.target && e.target.value) {
      this.questions[id].justify = e.target.value;
    }
  }

  submitForm(e: Event): void {
    e.preventDefault();
    let haveError: boolean = false;
    let erros = document.getElementsByClassName("erro");
    while (erros.length > 0) {
      if (erros[0].parentNode) erros[0].parentNode.removeChild(erros[0]);
    }

    this.questions.forEach((value, index) => {
      let field = (<HTMLInputElement>document.getElementById(`field-${index}`));
      if (!value.answer || (!value.justify && value.justifyRequired)) {
        field.classList.add("erro-field");
        haveError = true;

        if (!value.answer) {
          let answer = (<HTMLDivElement>document.querySelector(`#field-${index} .pergunta`));
          let erro: HTMLSpanElement = document.createElement('span');
          erro.style.color = "red";
          erro.classList.add("erro");
          erro.append("Campo Requerido");
          answer.append(erro);
        }
        if (!value.justify && value.justifyRequired) {
          let justify = (<HTMLDivElement>document.querySelector(`#field-${index} .justificativa`));
          let erro: HTMLSpanElement = document.createElement('span');
          erro.style.color = "red";
          erro.classList.add("erro");
          erro.append("Campo Requerido");
          justify.append(erro);
        }
      } else {
        field.classList.remove("erro-field");
      }
    })

    if (haveError) {
      console.log("formulário não enviado");
    } else {
      console.log("formulário enviado")
    }
  }
}
