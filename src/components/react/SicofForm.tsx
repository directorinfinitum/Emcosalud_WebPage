import { useState, useRef, type FormEvent } from 'react';
import { incidentes } from '@/data/sicof';

type FormState = {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsPrivacy: boolean;
  description: string;
  description2: string;
  appointmentDate: string;
  employeenames: string;
  place: string;
  incidenttype: string;
  situation: string;
  registrarDatos: 'SI' | 'NO' | '';
};

const initialState: FormState = {
  fullName: '',
  lastName: '',
  email: '',
  phone: '',
  acceptsPrivacy: false,
  description: '',
  description2: '',
  appointmentDate: '',
  employeenames: '',
  place: '',
  incidenttype: '',
  situation: '',
  registrarDatos: '',
};

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

const labelClass = 'mb-1.5 block text-sm font-semibold text-brand-blue';

export default function SicofForm() {
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

      // Agregar campos de texto al FormData
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value.toString());
      });

      // Agregar el archivo opcional si existe
      if (file) {
        data.append('records', file);
      }

      const response = await fetch('/api/sicof', {
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

  const showDatosPersonales = form.registrarDatos === 'SI';

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
          <label className={labelClass} htmlFor="sicof-email">
            Correo electrónico *
          </label>
          <input
            id="sicof-email"
            className={fieldClass}
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="sicof-situation">
            ¿Cuánto tiempo ha estado sucediendo dicha situación? *
          </label>
          <textarea
            id="sicof-situation"
            className={`${fieldClass} min-h-10 resize-y`}
            value={form.situation}
            required
            onChange={(event) => update('situation', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="sicof-description">
            Describa con detalles los actos indebidos que va a reportar *
          </label>
          <textarea
            id="sicof-description"
            className={`${fieldClass} min-h-10 resize-y`}
            value={form.description}
            required
            onChange={(event) => update('description', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="sicof-description2">
            ¿Cómo se dio cuenta de esta situación? *
          </label>
          <textarea
            id="sicof-description2"
            className={`${fieldClass} min-h-10 resize-y`}
            value={form.description2}
            required
            onChange={(event) => update('description2', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="sicof-appointmentDate">
            Fecha en que lo detectó *
          </label>

          <input
            id="sicof-appointmentDate"
            className={fieldClass}
            type="date"
            required
            value={form.appointmentDate}
            onChange={(event) => update('appointmentDate', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="sicof-employeenames">
            Nombre de los empleados, funcionarios involucrados *
          </label>
          <input
            id="sicof-employeenames"
            className={fieldClass}
            type="text"
            required
            autoComplete="name"
            value={form.employeenames}
            onChange={(event) => update('employeenames', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="sicof-place">
            ¿En qué lugar ocurrió? *
          </label>
          <input
            id="sicof-place"
            className={fieldClass}
            value={form.place}
            required
            onChange={(event) => update('place', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="sicof-incidenttype">
            Seleccione el tipo de incidente *
          </label>
          <select
            id="sicof-incidenttype"
            className={fieldClass}
            required
            value={form.incidenttype}
            onChange={(event) => update('incidenttype', event.target.value)}
          >
            <option value="">— Por favor, elige una opción —</option>
            {incidentes.map((sicof) => (
              <option key={sicof} value={sicof}>
                {sicof}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>
            ¿Desea registrar sus datos personales? *
          </label>

          <div className="mt-2 flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="registrarDatos"
                value="SI"
                required
                checked={form.registrarDatos === 'SI'}
                onChange={(e) => update('registrarDatos', e.target.value)}
              />
              Sí
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="registrarDatos"
                value="NO"
                required
                checked={form.registrarDatos === 'NO'}
                onChange={(e) => update('registrarDatos', e.target.value)}
              />
              No
            </label>
          </div>
        </div>

        {showDatosPersonales && (
          <>
            <div>
              <label className={labelClass}>Nombre</label>
              <input
                className={fieldClass}
                type="text"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Apellidos</label>
              <input
                className={fieldClass}
                type="text"
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Teléfono</label>
              <input
                className={fieldClass}
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
              />
            </div>
          </>
        )}

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