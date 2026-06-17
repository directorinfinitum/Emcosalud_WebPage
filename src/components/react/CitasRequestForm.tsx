import { useState, type FormEvent } from 'react';
import type { CitasDepartment } from '@/data/citas';
import {
  citasDocumentTypes,
  citasEnfermeriaDescriptions,
  citasJornadas,
  citasSedes,
  citasServices,
} from '@/data/citas';

type Props = {
  department: CitasDepartment;
};

type FormState = {
  fullName: string;
  email: string;
  documentType: string;
  documentNumber: string;
  address: string;
  phone: string;
  appointmentDate: string;
  jornada: string;
  sede: string;
  service: string;
  nursingDescription: string;
  serviceDescription: string;
  acceptsPrivacy: boolean;
};

const initialState: FormState = {
  fullName: '',
  email: '',
  documentType: '',
  documentNumber: '',
  address: '',
  phone: '',
  appointmentDate: '',
  jornada: '',
  sede: '',
  service: '',
  nursingDescription: '',
  serviceDescription: '',
  acceptsPrivacy: false,
};

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

const labelClass = 'mb-1.5 block text-sm font-semibold text-brand-blue';

export default function CitasRequestForm({ department }: Props) {
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
          Su solicitud ha sido registrada con éxito. Revise el correo electrónico que indicó para
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

  const showNursingDescription = form.service === 'ENFERMERIA';

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div>
          <label className={labelClass} htmlFor={`fullName-${department}`}>
            Nombre completo *
          </label>
          <input
            id={`fullName-${department}`}
            className={fieldClass}
            type="text"
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(event) => update('fullName', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`email-${department}`}>
            Correo electrónico *
          </label>
          <input
            id={`email-${department}`}
            className={fieldClass}
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`documentType-${department}`}>
            Tipo de documento *
          </label>
          <select
            id={`documentType-${department}`}
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
          <label className={labelClass} htmlFor={`documentNumber-${department}`}>
            Número de documento *
          </label>
          <input
            id={`documentNumber-${department}`}
            className={fieldClass}
            type="text"
            required
            value={form.documentNumber}
            onChange={(event) => update('documentNumber', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`address-${department}`}>
            Dirección *
          </label>
          <input
            id={`address-${department}`}
            className={fieldClass}
            type="text"
            required
            autoComplete="street-address"
            value={form.address}
            onChange={(event) => update('address', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`phone-${department}`}>
            Número de teléfono *
          </label>
          <input
            id={`phone-${department}`}
            className={fieldClass}
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`appointmentDate-${department}`}>
            Fecha aproximada para la cita *
          </label>
          <input
            id={`appointmentDate-${department}`}
            className={fieldClass}
            type="date"
            required
            value={form.appointmentDate}
            onChange={(event) => update('appointmentDate', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`jornada-${department}`}>
            Jornada para la cita *
          </label>
          <select
            id={`jornada-${department}`}
            className={fieldClass}
            required
            value={form.jornada}
            onChange={(event) => update('jornada', event.target.value)}
          >
            <option value="">— Por favor, elige una opción —</option>
            {citasJornadas.map((jornada) => (
              <option key={jornada} value={jornada}>
                {jornada}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor={`sede-${department}`}>
            Sede *
          </label>
          <select
            id={`sede-${department}`}
            className={fieldClass}
            required
            value={form.sede}
            onChange={(event) => update('sede', event.target.value)}
          >
            <option value="">— Por favor, elige una opción —</option>
            {citasSedes[department].map((sede) => (
              <option key={sede} value={sede}>
                {sede}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor={`service-${department}`}>
            Servicio *
          </label>
          <select
            id={`service-${department}`}
            className={fieldClass}
            required
            value={form.service}
            onChange={(event) => update('service', event.target.value)}
          >
            <option value="">— Por favor, elige una opción —</option>
            {citasServices[department].map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {showNursingDescription && (
          <div>
            <label className={labelClass} htmlFor={`nursingDescription-${department}`}>
              Descripción del servicio a solicitar
            </label>
            <select
              id={`nursingDescription-${department}`}
              className={fieldClass}
              value={form.nursingDescription}
              onChange={(event) => update('nursingDescription', event.target.value)}
            >
              <option value="">— Por favor, elige una opción —</option>
              {citasEnfermeriaDescriptions.map((description) => (
                <option key={description} value={description}>
                  {description}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor={`serviceDescription-${department}`}>
            Observaciones adicionales
          </label>
          <textarea
            id={`serviceDescription-${department}`}
            className={`${fieldClass} min-h-28 resize-y`}
            value={form.serviceDescription}
            onChange={(event) => update('serviceDescription', event.target.value)}
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
        Enviar solicitud
      </button>
    </form>
  );
}
