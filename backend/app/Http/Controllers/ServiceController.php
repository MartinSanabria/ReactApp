<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();
        return response()->json($services);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request -> validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
            'precio' => 'required'
        ]);
        $service = new Service();
        $service -> nombre = $request->nombre;
        $service -> descripcion = $request->descripcion;
        $service -> precio = $request -> precio;

        $existingService = Service::where('nombre', $request->nombre)->first();
            if ($existingService) {
                $data = [
                    'message' => 'El servicio ya esta registrado.'
                ];
            } else{
                $service -> save();
                $data = [
                    'message' => 'Servicio registrado satisfactoriamente'
                ];
            }
        

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        $service = Service::find($id);
        if (!$service) {
            $data = [
                'message' => 'Servicio no encontrado'
            ];
            return response()->json($data);
        } else{
            $result = [
                'nombre' => $service->nombre,
                'descripcion' => $service->descripcion,
                'precio' => $service->precio
            ];
            return response()->json($result);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        $request -> validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
            'precio' => 'required'
        ]);
        if (!$service) {
            $data = [
                'message' => 'Servicio no encontrado'
            ];
        } else {
            $service -> nombre = $request->nombre;
            $service -> descripcion = $request->descripcion;
            $service -> precio = $request -> precio;
            $service -> save();
    
            $data = [
                'message' => 'Servicio actualizado satisfactoriamente'
            ];
        }
        
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            $data = [
                'message' => 'Servicio no encontrado'
            ];
        } else {
            $service ->delete();
            $data = [
                'message' => 'Servicio borrado satisfactoriamente'
            ];
            return response()->json($data);
        }
    }

    public function clients(Request $request){
       
       
        // Obtén el servicio por su ID
        $service = Service::find($request->service_id);
    
        // Verifica si el servicio existe
        if (!$service) {
            // Manejo de error: Cliente no encontrado
            return response()->json(['error' => 'Servicio no encontrado'], 404);
        }
    
        // Intenta adjuntar el servicio al cliente
        try {
            $service->clients()->attach($request->client_id);
        } catch (\Exception $e) {
            // Manejo de error: Error al adjuntar el servicio
            return response()->json(['error' => 'Error al adjuntar el servicio'], 500);
        }
    
        // Si llegamos aquí, la operación fue exitosa
        $data = [
            'message' => 'Servicio contratado satisfactoriamente'
        ];
    
        return response()->json($data);
    }

    public function detach(Request $request){
       // Obtén el servicio por su ID
       $service = Service::find($request->service_id);
    
       // Verifica si el servicio existe
       if (!$service) {
           // Manejo de error: Cliente no encontrado
           return response()->json(['error' => 'Servicio no encontrado'], 404);
       }
   
       // Intenta adjuntar el servicio al cliente
       try {
           $service->clients()->detach($request->client_id);
       } catch (\Exception $e) {
           // Manejo de error: Error al adjuntar el servicio
           return response()->json(['error' => 'Error al adjuntar el servicio'], 500);
       }
   
       // Si llegamos aquí, la operación fue exitosa
       $data = [
           'message' => 'Servicio cancelado satisfactoriamente'
       ];
   
       return response()->json($data);
    }
}
