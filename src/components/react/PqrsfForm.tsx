import { useState, type FormEvent } from 'react';
import {
  departamento,
  sedeshuila,
  sedestolima,
  DocumentTypes
} from '@/data/pqrsf';


type FormState = {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsPrivacy: boolean;
  department: string;
  description: string;
  sedeshuila: string;
  sedestolima: string;
  document: string;
  NumDoc: string;
  address: string;
};

const initialState: FormState = {
  fullName: '',
  lastName:'',
  email: '',
  phone: '',
  acceptsPrivacy: false,
  department:'',
  description:'',
  sedeshuila:'',
  sedestolima:'',
  document:'',
  NumDoc:'',
  address:'',
};



const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

const labelClass = 'mb-1.5 block text-sm font-semibold text-brand-blue';

export default function PqrsfForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialState);
  };

   const showhuila = form.department ==='HUILA';
   const showtolima = form.department ==='TOLIMA';



  if (submitted) {
    return (
      <div className="space-y-4 rounded-xl border border-brand-green/30 bg-brand-green/5 p-5 text-center">
        <h2 className="m-0 text-xl font-bold text-brand-green-dark">Solicitud enviada</h2>
        <p className="m-0 text-slate-700">
          Su solicitud ha sido registrada con éxito.
        </p>
        <button
          type="button"
          className="btn btn--primary mx-auto"
          onClick={() => setSubmitted(false)}
        >
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4">

        <div>
          <label className={labelClass} htmlFor="pqrsf-fullName">
            Nombre completo *
          </label>
          <input
            id="pqrsf-fullName"
            className={fieldClass}
            type="text"
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(event) => update('fullName', event.target.value)}
          />
        </div>
        
        <div>
          <label className={labelClass} htmlFor="soat-email">
            Correo electrónico *
          </label>
          <input
            id="soat-email"
            className={fieldClass}
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
          />
        </div>

        
        <div>
          <label className={labelClass} htmlFor="pqrsf-address">
            Dirección *
          </label>
          <input
            id="pqrsf-address"
            className={fieldClass}
            type="text"
            required
            autoComplete="name"
            value={form.address}
            onChange={(event) => update('address', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="pqrsf-phone">
            Número de teléfono *
          </label>
          <input
            id="pqrsf-phone"
            className={fieldClass}
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="pqrsf-document">
            Tipo de Documento *
          </label>
          <select
            id="sicof-document"
            className={fieldClass}
            required
            value={form.document}
            onChange={(event) => update('document', event.target.value)}
            >
              <option value="">— Por favor, elige una opción —</option>
                {DocumentTypes.map((sicof) => (
              <option key={sicof} value={sicof}>
                {sicof}
              </option>
              ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="pqrsf-NumDoc">
            Numero de Identificación *
          </label>
          <input
            id="pqrsf-NumDoc"
            className={fieldClass}
            type="text"
            required
            autoComplete="name"
            value={form.NumDoc}
            onChange={(event) => update('NumDoc', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="pqrsf-department">
            Departamento *
          </label>
          <select
            id="sicof-department"
            className={fieldClass}
            required
            value={form.department}
            onChange={(event) => update('department', event.target.value)}
            >
              <option value="">— Por favor, elige una opción —</option>
                {departamento.map((sicof) => (
              <option key={sicof} value={sicof}>
                {sicof}
              </option>
              ))}
          </select>
        </div>

        {showhuila && (
          <div>
            <label className={labelClass} htmlFor="sedeshuila">
              Sede *
            </label>
            <select
              id="sedeshuila"
              className={fieldClass}
              value={form.sedeshuila}
              onChange={(event) => update('sedeshuila', event.target.value)}
            >
              <option value="">— Por favor, elige una opción —</option>
              {sedeshuila.map((description) => (
                <option key={description} value={description}>
                  {description}
                </option>
              ))}
            </select>
          </div>
        )}
        {showtolima && (
          <div>
            <label className={labelClass} htmlFor="sedestolima">
              Sede *
            </label>
            <select
              id="sedestolima"
              className={fieldClass}
              value={form.sedestolima}
              onChange={(event) => update('sedestolima', event.target.value)}
            >
              <option value="">— Por favor, elige una opción —</option>
              {sedestolima.map((description) => (
                <option key={description} value={description}>
                  {description}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor="sicof-description">
            Descripción *
          </label>
          <textarea
            id="sicof-description"
            className={`${fieldClass} min-h-20 resize-y`}
            value={form.description}
            required
            onChange={(event) => update('description', event.target.value)}
          />
        </div>
       
        <div>
          <label className={labelClass} htmlFor="records">
            Adjuntar evidencia (opcional)
          </label>
          <input
            id="records"
            className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-blue file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-blue-light"
            type="file"
            accept=".pdf,image/*"
            
          />
      </div>

        
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input
          className="mt-1 h-4 w-4 accent-brand-green"
          type="checkbox"
          required
          checked={form.acceptsPrivacy}
          onChange={(event) => update('acceptsPrivacy', event.target.checked)}
        />
        <span>
          Autorizo{' '}
          <a href="/politica-privacidad" className="font-semibold text-brand-blue">
            el tratamiento de datos
          </a>
          .
        </span>
      </label>

      <button type="submit" className="btn btn--primary w-full">
        Enviar
      </button>
    </form>
  );
}
