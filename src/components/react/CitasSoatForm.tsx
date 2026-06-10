import { useState, type FormEvent } from 'react';
import { citasDocumentTypes } from '@/data/citas';

type FormState = {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  phoneAlt: string;
  acceptsPrivacy: boolean;
};

const initialState: FormState = {
  firstName: '',
  lastName: '',
  documentType: '',
  documentNumber: '',
  email: '',
  phone: '',
  phoneAlt: '',
  acceptsPrivacy: false,
};

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

const labelClass = 'mb-1.5 block text-sm font-semibold text-brand-blue';

export default function CitasSoatForm() {
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

  if (submitted) {
    return (
      <div className="space-y-4 rounded-xl border border-brand-green/30 bg-brand-green/5 p-5 text-center">
        <h2 className="m-0 text-xl font-bold text-brand-green-dark">Solicitud enviada</h2>
        <p className="m-0 text-slate-700">
          Su solicitud SOAT ha sido registrada con éxito. Revise el correo electrónico indicado para
          recibir la respuesta en días hábiles.
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
          <label className={labelClass} htmlFor="soat-firstName">
            Nombres *
          </label>
          <input
            id="soat-firstName"
            className={fieldClass}
            type="text"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={(event) => update('firstName', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="soat-lastName">
            Apellidos *
          </label>
          <input
            id="soat-lastName"
            className={fieldClass}
            type="text"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={(event) => update('lastName', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="soat-documentType">
            Tipo de documento *
          </label>
          <select
            id="soat-documentType"
            className={fieldClass}
            required
            value={form.documentType}
            onChange={(event) => update('documentType', event.target.value)}
          >
            <option value="">— Por favor, elige una opción —</option>
            {citasDocumentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="soat-documentNumber">
            Número de documento *
          </label>
          <input
            id="soat-documentNumber"
            className={fieldClass}
            type="text"
            required
            value={form.documentNumber}
            onChange={(event) => update('documentNumber', event.target.value)}
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
          <label className={labelClass} htmlFor="soat-phone">
            Teléfono *
          </label>
          <input
            id="soat-phone"
            className={fieldClass}
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="soat-phoneAlt">
            Teléfono 2
          </label>
          <input
            id="soat-phoneAlt"
            className={fieldClass}
            type="tel"
            autoComplete="tel"
            value={form.phoneAlt}
            onChange={(event) => update('phoneAlt', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="soat-documentsPdf">
            Documentos en un solo PDF *
          </label>
          <p className="mb-2 text-xs leading-relaxed text-slate-600">
            Documento de identificación, tarjeta de propiedad, SOAT, FURIst y prefacturas.
          </p>
          <input
            id="soat-documentsPdf"
            className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-blue file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-blue-light"
            type="file"
            accept=".pdf,application/pdf"
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="soat-medicalOrder">
            Orden médica *
          </label>
          <input
            id="soat-medicalOrder"
            className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-blue file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-blue-light"
            type="file"
            accept=".pdf,image/*"
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="soat-serviceFormat">
            Formato de prestación de servicios *
          </label>
          <input
            id="soat-serviceFormat"
            className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-blue file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-blue-light"
            type="file"
            accept=".pdf,image/*"
            required
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
          Acepto la{' '}
          <a href="/politica-privacidad" className="font-semibold text-brand-blue">
            política de tratamiento de datos
          </a>
          .
        </span>
      </label>

      <button type="submit" className="btn btn--primary w-full">
        Enviar solicitud SOAT
      </button>
    </form>
  );
}
