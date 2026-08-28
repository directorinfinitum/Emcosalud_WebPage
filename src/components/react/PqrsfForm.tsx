import { useState, useRef, type FormEvent } from 'react';
import {
  departamento,
  sedeshuila,
  sedestolima,
  DocumentTypes,
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
  lastName: '',
  email: '',
  phone: '',
  acceptsPrivacy: false,
  department: '',
  description: '',
  sedeshuila: '',
  sedestolima: '',
  document: '',
  NumDoc: '',
  address: '',
};

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

const labelClass = 'mb-1.5 block text-sm font-semibold text-brand-blue';

export default function PqrsfForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value.toString());
      });

      if (file) {
        data.append('records', file);
      }

      const response = await fetch('/api/pqrsf', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al procesar la solicitud.');
      }

      setSubmitted(true);
      setForm(initialState);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error inesperado al enviar.');
    } finally {
      setLoading(false);
    }
  };

  const showhuila = form.department === 'HUILA';
  const showtolima = form.department === 'TOLIMA';

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
      {errorMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {errorMsg}
        </div>
      )}

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
          <label className={labelClass} htmlFor="pqrsf-email">
            Correo electrónico *
          </label>
          <input
            id="pqrsf-email"
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
            id="pqrsf-document"
            className={fieldClass}
            required
            value={form.document}
            onChange={(event) => update('document', event.target.value)}
          >
            <option value="">— Por favor, elige una opción —</option>
            {DocumentTypes.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="pqrsf-NumDoc">
            Número de Identificación *
          </label>
          <input
            id="pqrsf-NumDoc"
            className={fieldClass}
            type="text"
            required
            value={form.NumDoc}
            onChange={(event) => update('NumDoc', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="pqrsf-department">
            Departamento *
          </label>
          <select
            id="pqrsf-department"
            className={fieldClass}
            required
            value={form.department}
            onChange={(event) => {
              update('department', event.target.value);
              update('sedeshuila', '');
              update('sedestolima', '');
            }}
          >
            <option value="">— Por favor, elige una opción —</option>
            {departamento.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
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
              required
              value={form.sedeshuila}
              onChange={(event) => update('sedeshuila', event.target.value)}
            >
              <option value="">— Por favor, elige una opción —</option>
              {sedeshuila.map((sede) => (
                <option key={sede} value={sede}>
                  {sede}
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
              required
              value={form.sedestolima}
              onChange={(event) => update('sedestolima', event.target.value)}
            >
              <option value="">— Por favor, elige una opción —</option>
              {sedestolima.map((sede) => (
                <option key={sede} value={sede}>
                  {sede}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor="pqrsf-description">
            Descripción *
          </label>
          <textarea
            id="pqrsf-description"
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
            ref={fileInputRef}
            className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-blue file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-blue-light"
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              } else {
                setFile(null);
              }
            }}
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

      <button type="submit" className="btn btn--primary w-full" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}