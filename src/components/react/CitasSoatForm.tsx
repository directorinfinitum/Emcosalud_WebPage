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
  documentsPdf: File | null;
  medicalOrder: File | null;
  serviceFormat: File | null;
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
  documentsPdf: null,
  medicalOrder: null,
  serviceFormat: null,
};

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

const labelClass = 'mb-1.5 block text-sm font-semibold text-brand-blue';

export default function CitasSoatForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string | boolean | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && !(value instanceof File)) {
        formData.append(key, String(value));
      }
    });

    if (form.documentsPdf) formData.append('documentsPdf', form.documentsPdf);
    if (form.medicalOrder) formData.append('medicalOrder', form.medicalOrder);
    if (form.serviceFormat) formData.append('serviceFormat', form.serviceFormat);

    try {
      const response = await fetch('/api/citas/soat', {
        method: 'POST',
        body: formData,
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(resData.message || 'Error en la solicitud. Intente nuevamente.');
      }

      setSubmitted(true);
      setForm(initialState);
    } catch (err: any) {
      console.error('Error al enviar formulario SOAT:', err);
      setErrorMsg(err.message || 'Ocurrió un error inesperado al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
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
    <form className="relative space-y-4" onSubmit={handleSubmit}>
      {/* Modal / Toast emergente de error visualmente accesible */}
      {errorMsg && (
        <div className="sticky top-4 z-50 flex items-start justify-between gap-3 rounded-xl border border-red-300 bg-red-50 p-4 shadow-lg text-sm text-red-700">
          <div>
            <p className="font-bold m-0">No se pudo enviar la solicitud</p>
            <p className="m-0 text-xs text-red-600 mt-1">{errorMsg}</p>
          </div>
          <button
            type="button"
            className="text-red-500 hover:text-red-800 font-bold text-base leading-none"
            onClick={() => setErrorMsg(null)}
          >
            ✕
          </button>
        </div>
      )}

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
            Documento de identificación, tarjeta de propiedad, SOAT, FURIPS y prefacturas.
          </p>
          <input
            id="soat-documentsPdf"
            className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-blue file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-blue-light"
            type="file"
            accept=".pdf,application/pdf"
            required
            onChange={(event) => update('documentsPdf', event.target.files?.[0] ?? null)}
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
            onChange={(event) => update('medicalOrder', event.target.files?.[0] ?? null)}
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
            onChange={(event) => update('serviceFormat', event.target.files?.[0] ?? null)}
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

      <button
        type="submit"
        className="btn btn--primary w-full disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando solicitud...' : 'Enviar solicitud'}
      </button>
    </form>
  );
}